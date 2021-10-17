import { rest } from "msw";

import { mockLogin, mockLogout } from "./api/auth";

const API = "https://localhost:3000/api";

export const handlers = [rest.post(`${API}/login`, mockLogin), rest.post(`${API}/logout`, mockLogout)];
