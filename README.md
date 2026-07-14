# E-commerce-Website-Iclick

Full-stack e-commerce demo:

- **backend/** – Django + Django REST Framework API (products, categories, cart, JWT auth)
- **frontend/** – React (Vite) single-page app

## Local development

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data      # loads demo categories + products
python manage.py runserver      # http://127.0.0.1:8000
```

### Frontend

Requires Node.js **20.19+** or **22.12+** (Vite 8).

```bash
cd frontend
npm install
npm run dev                     # http://127.0.0.1:5173
```

The Vite dev server proxies `/api` and `/media` to the backend at
`http://127.0.0.1:8000`, so no extra config is needed locally.

## Deployment

The frontend (Vercel) and backend (Render/Railway) deploy separately.

### Backend – Render (`render.yaml`) or Railway (`railway.toml`)

Both configs run migrations, `collectstatic`, and `seed_data` on deploy, so the
store is populated on first boot. Static files are served by WhiteNoise and the
committed product/category images under `backend/media/` are served by Django.

Environment variables:

| Variable | Example | Notes |
| --- | --- | --- |
| `DEBUG` | `False` | Must be `False` in production |
| `SECRET_KEY` | *(auto-generated on Render)* | Set a long random value |
| `ALLOWED_HOSTS` | `*.onrender.com,localhost,127.0.0.1` | Comma-separated |
| `CORS_ALLOWED_ORIGINS` | `https://<your-app>.vercel.app` | Comma-separated |
| `CSRF_TRUSTED_ORIGINS` | `https://<your-app>.vercel.app` | Comma-separated |

### Frontend – Vercel (`vercel.json`)

Build command `cd frontend && npm install && npm run build`, output
`frontend/dist`. Set this environment variable in the Vercel project:

| Variable | Example |
| --- | --- |
| `VITE_API_BASE_URL` | `https://<your-backend>.onrender.com/api/` |

After deploying the backend, put its URL in `VITE_API_BASE_URL`, then add the
Vercel domain to the backend's `CORS_ALLOWED_ORIGINS` / `CSRF_TRUSTED_ORIGINS`
and redeploy.
