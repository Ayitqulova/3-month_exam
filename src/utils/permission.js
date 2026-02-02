export const rolePermission = {
    user: {
        "GET": ["/api/branch", "/api/transport"] // User faqat ko'ra oladi
    },
    admin: {
        "GET": ["/api/branch", "/api/transport", "/api/staff"],
        "POST": ["/api/transport"], // Admin faqat transport qo'shsin, filial emas
        "PUT": ["/api/transport"],
        "DELETE": [] // Admin o'chirolmasin
    },
    superadmin: {
        "ALL": true // Superadmin hamma narsani qila oladi
    }
};

