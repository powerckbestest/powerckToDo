/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = [
      {
        value: 'Сходить в магазин',
        status: false,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        value: 'Вынести мусор',
        status: false,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Tasks', arr, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
