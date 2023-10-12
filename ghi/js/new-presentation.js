window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();

        const selectTag = document.getElementById('location');
        for (let location of data.locations) {
            const option = document.createElement("option");
            option.value = location.id;
            option.innerHTML = location.name;
            selectTag.appendChild(option);
        }
    }
        const formTag = document.getElementById('create-presentation-form');
        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));

            const locationUrl = 'http://localhost:8000/api/conference/';
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newLocation = await response.json();
            }
        });
});
