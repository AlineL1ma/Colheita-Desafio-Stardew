const { deleteHarvest } = require("../../meu-sistema/controllers/HarvestController");

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api'; // Atualize para o URL correto da sua API
    const harvestModal = document.getElementById('harvestModal');
    const harvestForm = document.getElementById('harvestForm');
    const addHarvestBtn = document.getElementById('addHarvestBtn');
    const modalTitleHarvest = document.getElementById('modalTitleHarvest');
    let editHarvestId = null;

    // Função para carregar plantações
    const loadHarvest = async () => {
        const response = await fetch(`${apiUrl}/harvests`);
        const harvest = await response.json();
        const tableBody = document.querySelector('#harvestsTable tbody');
        tableBody.innerHTML = '';

        harvests.forEach(harvest => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${harvest.name}</td>
                <td>${harvest.description}</td>
                <td>${harvest.responsible ? harvest.responsible.name : 'N/A'}</td>
                <td>
                    <button class="editHarvestBtn" data-id="${harvest._id}">Editar</button>
                    <button class="deleteHarvestBtn" data-id="${harvest._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        
        document.querySelectorAll('.editHarvestBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditHarvestModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deleteHarvestBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteHarvest(e.target.dataset.id));
        });
    };

   
    const addHarvest = async (harvest) => {
        await fetch(`${apiUrl}/harvests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(harvest)
        });
        loadHarvests();
    };

    // Função para atualizar Colheita
    const updateHarvest = async (id, harvest) => {
        await fetch(`${apiUrl}/Harvests/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(harvest)
        });
        loadHarvests();
    };


    const deleteHarvest = async (id) => {
        await fetch(`${apiUrl}/harvests/${id}`, {
            method: 'DELETE'
        });
        loadHarvests();
    };


    const openEditHarvestModal = async (id) => {
        editHarvestId = id;
        modalTitleHarvest.innerText = 'Editar Colheita';


        const response = await fetch(`${apiUrl}/harvests/${id}`);
        if (response.status === 404) {
            console.error('Colheita não encontrada');
            return;
        }
        const harvest = await response.json();

        document.getElementById('nameHarvest').value = harvest.name;
        document.getElementById('description').value = harvest.description;
        await loadSuppliers(harvest.responsible ? harvest.responsible._id : null);

        harvestModal.style.display = 'block';
    };

    
    const openAddHarvestModal = async () => {
        editHarvestId = null;
        modalTitleHarvest.innerText = 'Adicionar Colheita';
        harvestForm.reset();
        await loadSuppliers(); 
        harvestModal.style.display = 'block';
    };


    const loadSuppliers = async (selectedSupplierId = null) => {
        const response = await fetch(`${apiUrl}/suppliers`);
        const suppliers = await response.json();
        const select = document.getElementById('responsible');
        select.innerHTML = ''; 

        suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier._id;
            option.text = supplier.name;
            if (supplier._id === selectedSupplierId) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    };

 
    document.querySelector('.close').addEventListener('click', () => {
        harvestModal.style.display = 'none';
    });

   
    window.addEventListener('click', (event) => {
        if (event.target === harvestModal) {
            harvestModal.style.display = 'none';
        }
    });


    harvestForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const harvestData = {
            name: document.getElementById('nameHarvest').value,
            description: document.getElementById('description').value,
            responsible: document.getElementById('responsible').value
        };

        if (editHarvestId) {
            await updateHarvest(editHarvestId, harvestData);
        } else {
            await addHarvest(harvestData);
        }

        harvestModal.style.display = 'none';
        loadHarvests();
    });


    addHarvestBtn.addEventListener('click', openAddHarvestModal);
    loadHarvests();
});
