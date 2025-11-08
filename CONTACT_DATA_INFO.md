# Contact Form Data Storage

## Where Contact Data is Stored

All contact form submissions are stored in the **Supabase database** in the `contact_submissions` table.

### Database Schema
- **Table Name**: `contact_submissions`
- **Columns**:
  - `id` (uuid) - Unique identifier
  - `name` (text) - User's name
  - `email` (text) - User's email
  - `message` (text) - User's message
  - `user_id` (uuid, nullable) - Associated user ID if logged in
  - `status` (text) - Status of submission (default: 'new')
  - `created_at` (timestamp) - Submission timestamp

## How to Access Contact Data

### 1. Admin Dashboard (Web Interface)
- **URL**: `/admin` route
- **Access**: Only users with 'admin' role can access
- **Features**:
  - View all contact submissions in a table
  - See submission details (name, email, message, date)
  - Export all submissions as JSON file
  - Click "Export JSON" button to download data

### 2. Database Query (Direct Access)
You can query the data directly using Supabase client:

```typescript
const { data, error } = await supabase
  .from('contact_submissions')
  .select('*')
  .order('created_at', { ascending: false });
```

### 3. Export as JSON File
- Go to Admin Dashboard (`/admin`)
- Click the "Export JSON" button
- Downloads file: `contact-submissions-YYYY-MM-DD.json`
- File contains all submissions in structured JSON format

## Example JSON Format
```json
[
  {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I have a question about career paths...",
    "user_id": "user-uuid-or-null",
    "status": "new",
    "created_at": "2025-10-31T10:30:00.000Z"
  }
]
```

## Security
- **RLS Policies**: Row Level Security enabled
- **User Access**: Users can only see their own submissions
- **Admin Access**: Admins can see all submissions
- **Anonymous Submissions**: Allowed (user_id = null)

## To Become an Admin
Admin roles are managed in the `user_roles` table. To create an admin:

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('your-user-id-here', 'admin');
```

Note: Contact the database administrator to assign admin role.
