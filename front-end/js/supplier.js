document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api'; 
    const supplierModal = document.getElementById('supplierModal');
    const supplierForm = document.getElementById('supplierForm');
    const addSupplierBtn = document.getElementById('addSupplierBtn');
    const modalTitle = document.getElementById('modalTitle');
    let editSupplierId = null;

    // Função para carregar usuários
    const loadSupplier = async () => {
        const response = await fetch(`${apiUrl}/suppliers`);
        const suppliers = await response.json();
        const tableBody = document.querySelector('#suppliersTable tbody');
        tableBody.innerHTML = '';

        suppliers.forEach(supplier => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${supplier.name}</td>
                <td>${supplier.profile}</td>
                <td>
                    <button class="editSupplierBtn" data-id="${supplier._id}">Editar</button>
                    <button class="deleteSupplierBtn" data-id="${supplier._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });


        document.querySelectorAll('.editSupplierBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditSupplierModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deleteSupplierBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteSupplier(e.target.dataset.id));
        });
    };


    const addSupplier = async (supplier) => {
        await fetch(`${apiUrl}/suppliers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(supplier)
        });
        loadSupplier();
    };


    const updateSupplier = async (id, supplier) => {
        await fetch(`${apiUrl}/supplier/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(supplier)
        });
        loadSupplier();
    };

    const deleteSupplier = async (id) => {
        await fetch(`${apiUrl}/suppliers/${id}`, {
            method: 'DELETE'
        });
        loadSupplier();
    };

    const openEditSupplierModal = async (id) => {
        editSupplierId = id;
        modalTitle.innerText = 'Editar Usuário';

        const response = await fetch(`${apiUrl}/suppliers/${supplier}`);
        const supplier = await response.json();

        document.getElementById('name').value = supplier.name;
        document.getElementById('profile').value = supplier.profile;
        document.getElementById('password').value = ''; // Não exibir senha

        supplierModal.style.display = 'block';
    };


    const openAddSupplierModal = () => {
        editSupplierId = null;
        modalTitle.innerText = 'Adicionar Usuário';
        supplierForm.reset();
        supplierModal.style.display = 'block';
    };


    document.querySelector('.close').addEventListener('click', () => {
        supplierModal.style.display = 'none';
    });


    window.addEventListener('click', (event) => {
        if (event.target === supplierModal) {
            supplierModal.style.display = 'none';
        }
    });


    supplierForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userData = {
            name: document.getElementById('name').value,
            profile: document.getElementById('profile').value,
            password: document.getElementById('password').value
        };

        if (editSupplierId) {
            await updateUser(editSupplierId, supplierData);
        } else {
            await addUser(supplierData);
        }

        supplierModal.style.display = 'none';
        loadUsers();
    });


    addSupplierBtn.addEventListener('click', openAddSupplierModal);
    loadUsers();
});
