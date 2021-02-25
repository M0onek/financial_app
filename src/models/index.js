import Account from './Account';
import Expense from './Expense';
import ExpenseCategory from './ExpenseCategory';
import Income from './Income';
import IncomeCategory from './IncomeCategory';
import User from './User';

Account.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Account, { foreignKey: 'userId', onDelete: 'Cascade' });

Account.hasMany(Income, { foreignKey: 'accountId', onDelete: 'Cascade' });
Account.hasMany(Expense, { foreignKey: 'accountId', onDelete: 'Cascade' });
Account.hasMany(IncomeCategory, { foreignKey: 'accountId', onDelete: 'Cascade' });
Account.hasMany(ExpenseCategory, { foreignKey: 'accountId', onDelete: 'Cascade' });

Income.belongsTo(Account, { foreignKey: 'accountId' });
Income.belongsTo(IncomeCategory, { foreignKey: 'categoryId' });

Expense.belongsTo(Account, { foreignKey: 'accountId' });
Expense.belongsTo(ExpenseCategory, { foreignKey: 'categoryId' });

IncomeCategory.belongsTo(Account, { foreignKey: 'accountId' });
IncomeCategory.hasMany(Income, { foreignKey: 'categoryId', onDelete: 'Cascade' });

ExpenseCategory.belongsTo(Account, { foreignKey: 'accountId' });
ExpenseCategory.hasMany(Expense, { foreignKey: 'accountId', onDelete: 'Cascade' });

export { User, Account, Income, Expense, IncomeCategory, ExpenseCategory };