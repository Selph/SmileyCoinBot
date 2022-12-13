import { Sequelize } from 'sequelize'

export const SQLize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

export function Wallets(sequelize) { 
    return sequelize.define('wallets', {
        username: { 
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true
        },
        balance: Sequelize.INTEGER,
        address: Sequelize.STRING,
        withdraw_address: Sequelize.STRING,
        usage_count: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    });
}

export function Transactions(Wallets, sequelize) {
    return sequelize.define('transactions', {
        tx_id: { 
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true
        },
        amount: Sequelize.INTEGER,
        type: Sequelize.STRING,
        address: Sequelize.STRING,
        from: {
            type: Sequelize.STRING,
            references: {
                model: Wallets,
                key: 'username'
            }
        },
        to: {
            type: Sequelize.STRING,
            references: {
                model: Wallets,
                key: 'username'
            }
        },
        usage_count: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    });
}