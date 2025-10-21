const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const NVIDIA_NIM_API_URL = 'https://api.nvidia.com/nim'; // замените на актуальный адрес NIM API

app.post('/proxy', async (req, res) => {
    try {
        const userRequest = req.body;

        // Формируем запрос к NVIDIA NIM API
        const nimRequest = {
            ...userRequest,
            // В случае необходимости добавьте дополнительные параметры
            // Например, включение reasoning
            reasoning: true
        };

        const response = await axios.post(NVIDIA_NIM_API_URL, nimRequest, {
            headers: {
                'Authorization': 'Bearer YOUR_NVIDIA_API_KEY',
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при обращении к NVIDIA NIM API' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
