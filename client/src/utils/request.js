import { GRAPHQL_SERVER_URL } from "./constants";

export const graphQLRequest = async (payload, options = {}) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("accessToken");
    
    if (token) {
        const res = await fetch(`${GRAPHQL_SERVER_URL}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`, // Đặt token vào header
                ...options,
            },
            body: JSON.stringify(payload),
        });

        // Kiểm tra nếu yêu cầu thành công (status 2xx)
        if (!res.ok) {
            if (res.status === 403) {
                return null;
            }
        }

        try {
            const { data } = await res.json();
            return data;
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu GraphQL:", error);
            throw error; // Hoặc có thể xử lý lỗi theo cách khác
        }
    } else {
        console.error("Không có access token trong localStorage");
        return null;
    }
};
