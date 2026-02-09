const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cycwqadkupxdkndiapak.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5Y3dxYWRrdXB4ZGtuZGlhcGFrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYzMTYxNywiZXhwIjoyMDg1MjA3NjE3fQ.-KTIcJenoTi2Il4NOS7w70bAjuIgeQ1Del0g0bbT-5E';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestUser() {
  const email = 'test@example.com';
  const password = 'password123';

  // Check if user exists
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error('Error listing users:', listError);
    return;
  }

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    console.log('Test user already exists');
    // Update password to be sure
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      existingUser.id,
      { password: password, email_confirm: true }
    );
    if (updateError) {
      console.error('Error updating user:', updateError);
    } else {
      console.log('Test user password updated');
    }
  } else {
    console.log('Creating test user...');
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (error) {
      console.error('Error creating user:', error);
    } else {
      console.log('Test user created:', data.user.id);
    }
  }
}

createTestUser();
