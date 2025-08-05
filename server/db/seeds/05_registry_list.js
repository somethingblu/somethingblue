/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('registry_list').del();

  // Inserts seed entries
  await knex('registry_list').insert([
    {
      registry_name: 'KitchenAid Mixer',
      price: 299.99,
      description: 'Stand mixer in ice blue',
      was_purchased: false,
      user_id: 1
    },
    {
      registry_name: 'Dyson Vacuum',
      price: 499.99,
      description: 'Cordless stick vacuum',
      was_purchased: true,
      user_id: 2
    },
    {
      registry_name: 'Le Creuset Dutch Oven',
      price: 350.00,
      description: 'Enameled cast iron in red',
      was_purchased: false,
      user_id: 3
    },
    {
      registry_name: 'Nespresso Machine',
      price: 200.00,
      description: 'Espresso and coffee maker',
      was_purchased: true,
      user_id: 4
    },
    {
      registry_name: 'Cast Iron Skillet',
      price: 45.00,
      description: '12-inch pre-seasoned skillet',
      was_purchased: false,
      user_id: 5
    }
  ]);
};
