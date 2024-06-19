import User from '@src/models/user.model';


// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(email: string): Promise<User | null> {
  const user = await User.findOne({ where: { email } });
  return user ? user : null;
}

/**
 * Get all users.
 */
async function getAll(): Promise<any> {
  const user = await User.findAll();
  return user;
}

/**
 * Add one user.
 */
async function add(user: any): Promise<User> {
  const saved = await User.create(user);
  const created = await saved.save()
  console.log("saved", saved)
  console.log("created", created)
  return saved;
}





// **** Export default **** //

export default {
  getOne,
  getAll,
  add,
} as const;
