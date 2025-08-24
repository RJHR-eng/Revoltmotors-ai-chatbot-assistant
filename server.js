const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API endpoint to demonstrate backend functionality
app.get('/api/info', (req, res) => {
    res.json({
        project: 'Revolt Motors Voice Assistant',
        developer: 'Radhika Jangra',
        description: 'A voice-enabled chatbot supporting multiple Indian languages',
        features: [
            'Voice recognition',
            'Text-to-speech',
            'Multi-language support (10 Indian languages)',
            'Real-time chat interface',
            'Responsive design'
        ],
        technology: {
            frontend: 'HTML, CSS, JavaScript',
            backend: 'Node.js, Express',
            apis: 'Web Speech API'
        },
        endpoints: {
            chat: '/api/chat (POST)',
            info: '/api/info (GET)'
        }
    });
});

// Simulated chat endpoint (in a real application, this would connect to AI services)
app.post('/api/chat', (req, res) => {
    const { message, language = 'en' } = req.body;
    
    // Simulate AI processing delay
    setTimeout(() => {
        const responses = {
            en: "I'm the Revolt Motors assistant. How can I help you with our electric bikes today?",
            hi: "मैं रिवोल्ट मोटर्स सहायक हूं। मैं आपकी इलेक्ट्रिक बाइक के बारे में आज कैसे मदद कर सकता हूं?",
            ta: "நான் ரிவோல்ட் மோட்டார்ஸ் உதவியாளர். எங்கள் மின்சார பைக்குகள் குறித்து இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
            te: "నేను రివోల్ట్ మోటార్స్ సహాయకుడిని. మీ ఎలక్ట్రిక్ బైక్ల గురించి నేను ఈరోజు మీకు ఎలా సహాయం చేయగలను?",
            bn: "আমি Revolt Motors assistant। আমাদের ইলেকট্রিক বাইক সম্পর্কে আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
        };

        res.json({
            success: true,
            response: responses[language] || responses.en,
            language: language,
            timestamp: new Date().toISOString()
        });
    }, 1000);
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found',
        availableEndpoints: {
            home: '/',
            apiInfo: '/api/info',
            chat: '/api/chat (POST)'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Revolt Motors Voice Assistant server running on port ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`🤖 API Info: http://localhost:3000/api/info`);
    console.log(`💬 Chat endpoint: http://localhost:3000/api/chat`);
    console.log(`👨‍💻 Developer: Radhika Jangra`);
});
