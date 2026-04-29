
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://scb.aspune.cloud";

const isBrowser = typeof window !== "undefined";
export const getImageUrl = (path: string | null | undefined) => {
    if (!path) return '';


    let cleanPath = path.replace(/\\/g, '/');


    if (cleanPath.startsWith('http') || cleanPath.startsWith('data:')) return cleanPath;


    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;


    return `${API_BASE_URL}${cleanPath}`;
};



export const authApi = {

    async login(email: string, password: string) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Store token & user
            if (isBrowser) {
                localStorage.setItem("admin_token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
            }

            return data;
        } catch (error: any) {
            console.error("Login Error:", error.message);
            throw error;
        }
    },

    // FORGOT PASSWORD
    async forgotPassword(email: string) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Request failed");
            }

            return data;
        } catch (error: any) {
            console.error("Forgot Password Error:", error.message);
            throw error;
        }
    },

    // RESET PASSWORD
    async resetPassword(email: string, otp: string, newPassword: string) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Reset failed");
            }

            return data;
        } catch (error: any) {
            console.error("Reset Password Error:", error.message);
            throw error;
        }
    },

    // LOGOUT
    logout() {
        if (isBrowser) {
            localStorage.removeItem("admin_token");
            localStorage.removeItem("user");
        }
    },

    // GET TOKEN
    getToken() {
        return isBrowser ? localStorage.getItem("admin_token") : null;
    },

    // GET USER
    getUser() {
        if (!isBrowser) return null;
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },

    // CHECK AUTH
    isAuthenticated() {
        return isBrowser ? !!localStorage.getItem("admin_token") : false;
    },
};


// =======================================================
// BLOG API
// =======================================================
export const blogApi = {
    // GET ALL BLOGS
    async getAll(page: number = 1, limit: number = 10) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/blogs?page=${page}&limit=${limit}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch blogs");
            }

            return data;
        } catch (error: any) {
            console.error("Get Blogs Error:", error.message);
            throw error;
        }
    },

    // GET BLOG BY ID
    async getById(id: number) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch blog");
            }

            return data;
        } catch (error: any) {
            console.error("Get Blog Error:", error.message);
            throw error;
        }
    },

    // GET BLOGS BY CATEGORY
    async getByCategory(categoryId: number, page: number = 1, limit: number = 10) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/blogs/category/${categoryId}?page=${page}&limit=${limit}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch category blogs");
            }

            return data;
        } catch (error: any) {
            console.error("Get Blogs By Category Error:", error.message);
            throw error;
        }
    },

    // CREATE BLOG
    async create(blogData: {
        title: string;
        shortDescription: string;
        longDescription: string;
        categoryId: number;
        image?: File | null;
    }) {
        try {
            const token = isBrowser ? localStorage.getItem("admin_token") : null;

            if (!token) {
                throw new Error("Unauthorized: No authentication token found");
            }

            const formData = new FormData();
            formData.append("title", blogData.title);
            formData.append("shortDescription", blogData.shortDescription);
            formData.append("longDescription", blogData.longDescription);
            formData.append("categoryId", blogData.categoryId.toString());

            // Only append image if it exists
            if (blogData.image) {
                formData.append("image", blogData.image);
            }

            const response = await fetch(`${API_BASE_URL}/api/blogs`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Blog creation failed");
            }

            return data;
        } catch (error: any) {
            console.error("Create Blog Error:", error.message);
            throw error;
        }
    },

    // UPDATE BLOG
    async update(id: number, blogData: any) {
        try {
            const token = isBrowser ? localStorage.getItem("admin_token") : null;

            if (!token) {
                throw new Error("Unauthorized: No authentication token found");
            }

            const formData = new FormData();

            // Append all provided fields
            if (blogData.title !== undefined && blogData.title !== null) {
                formData.append("title", blogData.title);
            }
            if (blogData.shortDescription !== undefined && blogData.shortDescription !== null) {
                formData.append("shortDescription", blogData.shortDescription);
            }
            if (blogData.longDescription !== undefined && blogData.longDescription !== null) {
                formData.append("longDescription", blogData.longDescription);
            }
            if (blogData.categoryId !== undefined && blogData.categoryId !== null) {
                formData.append("categoryId", blogData.categoryId.toString());
            }
            // Only append image if it's actually a File object
            if (blogData.image instanceof File) {
                formData.append("image", blogData.image);
            }
            if (typeof blogData.image === "string" && blogData.image.trim()) {
                formData.append("image", blogData.image);
            }

            const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            let data: any = null;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                data = { error: text || `Server returned ${response.status} ${response.statusText}` };
            }

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                    data?.error ||
                    data?.details ||
                    `Update failed (${response.status})`
                );
            }

            return data;
        } catch (error: any) {
            console.error("Update Blog Error:", error.message);
            throw error;
        }
    },

    // DELETE BLOG
    async delete(id: number) {
        try {
            const token = isBrowser ? localStorage.getItem("admin_token") : null;

            const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Delete failed");
            }

            return data;
        } catch (error: any) {
            console.error("Delete Blog Error:", error.message);
            throw error;
        }
    },
};


// =======================================================
// CATEGORY API
// =======================================================
export const categoryApi = {
    // GET ALL
    async getAll(page: number = 1, limit: number = 10) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/categories?page=${page}&limit=${limit}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch categories");
            }

            return data;
        } catch (error: any) {
            console.error("Get Categories Error:", error.message);
            throw error;
        }
    },

    // CREATE CATEGORY
    async create(name: string) {
        try {
            const token = isBrowser ? localStorage.getItem("admin_token") : null;
            console.log("Creating category:", name);

            const response = await fetch(`${API_BASE_URL}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error("Server Error (Non-JSON):", text);
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }

            if (!response.ok) {
                console.error("Create Category API Error:", data);
                throw new Error(data.message || data.error || "Create failed");
            }

            return data;
        } catch (error: any) {
            console.error("Create Category Error:", error.message);
            throw error;
        }
    },

    // UPDATE CATEGORY
    async update(id: number, name: string) {
        try {
            const token = isBrowser ? localStorage.getItem("admin_token") : null;

            const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name }),
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                const text = await response.text();
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }

            if (!response.ok) {
                console.error("Update Category API Error:", data);
                throw new Error(data.message || data.error || "Update failed");
            }

            return data;
        } catch (error: any) {
            console.error("Update Category Error:", error.message);
            throw error;
        }
    },

    // DELETE CATEGORY
    async delete(id: number) {
        try {
            const token = isBrowser ? localStorage.getItem("admin_token") : null;

            const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                // Some deletes return 204 No Content
                if (response.status === 204) return { success: true };
                const text = await response.text();
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }

            if (!response.ok) {
                console.error("Delete Category API Error:", data);
                throw new Error(data.message || data.error || "Delete failed");
            }

            return data;
        } catch (error: any) {
            console.error("Delete Category Error:", error.message);
            throw error;
        }
    },
};
