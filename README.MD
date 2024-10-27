## Backend Setup (Article-backend)

1. **Navigate to the frontend directory:**
   ```bash
   cd Article-backend
   ```

2. **Environment Setup:**
   - Copy the sample environment file:
     ```bash
     cp .env.sample .env.dev
     ```
   - Open `.env.dev` and replace placeholder values (e.g., `SECRET_KEY`, `DATABASE_URL`, etc.) with your actual secret keys and credentials.

3. **Create a virtual environment and activate it:**
   - Create a virtual environment:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - **For Windows:**
       ```bash
       .\venv\Scripts\activate
       ```
     - **For macOS/Linux:**
       ```bash
       source venv/bin/activate
       ```

4. **Install required packages:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the backend server:**
   ```bash
   python main.py
   ```

---

## Frontend Setup (Article-frontend)

1. **Navigate to the frontend directory:**
   ```bash
   cd Article-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the frontend server:**
   ```bash
   npm run start
   ```

---

## Project Structure

- **Article-backend**: Contains backend code, including API and database models.
- **Article-frontend**: Contains frontend code, including UI and application logic.

---

## Notes

- Ensure that your backend is running before starting the frontend.
- Verify that all environment variables are properly set up in `.env.dev` for the backend to work as expected.
