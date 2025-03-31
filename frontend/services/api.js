import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const contractService = {
    userOperations: {
        // Submit new document for verification
        submitDocument: async (documentData) => {
            return await api.post('/submit', documentData);
        },

        // Get list of user's document requests
        getUserRequests: async () => {
            return await api.get('/users');
        },

        // Grant access to verifier
        giveAccess: async (accessData) => {
            return await api.post('/access', accessData);
        }
    },
    adminOperations: {
        // Get list of pending verifications
        getVerificationRequests: async () => {
            return await api.get('/verifiers');
        },

        // Verify submitted document
        verifyDocument: async (verificationData) => {
            return await api.post('/verify', verificationData);
        },

        // Get verifier details
        getVerifierAddress: async (verifier) => {
            return await api.get(`/verifier/address/${verifier}`);
        },

        getVerifierName: async (address) => {
            return await api.get(`/verifier/name/${address}`);
        }
    },
    handleApiError: (error) => {
        const errorMessage = error.response?.data?.message || 
                           error.message || 
                           'An error occurred';
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
    }
};

api.interceptors.response.use(
    response => response,
    error => Promise.reject(contractService.handleApiError(error))
);

api.interceptors.request.use(
    config => {
        const walletAddress = localStorage.getItem('walletAddress');
        if (walletAddress) {
            config.headers['Authorization'] = `Wallet ${walletAddress}`;
        }
        return config;
    },
    error => Promise.reject(error)
);