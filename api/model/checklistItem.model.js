module.exports = (sequelize, datatypes) => {
  const ChecklistItem = sequelize.define(
    'checklistitem',
    {
      id: {
        type: datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      itemName: { type: datatypes.STRING, allowNull: false },
      status: { type: datatypes.BOOLEAN, allowNull: false, defaultValue: false },
      checklistId: datatypes.INTEGER,
    },
  );
  return ChecklistItem;
};
