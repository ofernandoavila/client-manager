export const SystemAPI = {
    ResetAllPreferences: async () => {
        return await fetch("http://localhost:80/client-manager/api/system/reset-preferences", {
            method: 'get',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            return data;
        });
    }
}