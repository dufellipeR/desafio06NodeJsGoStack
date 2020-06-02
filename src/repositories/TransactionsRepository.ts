/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string,
  value: number,
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];




  constructor() {
    this.transactions = [];

  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value
            break;
          case 'outcome':
            accumulator.outcome += transaction.value
            break
          default:
            break;
        }

        return accumulator
      },
      {
        income: 0,
        outcome: 0,
        total: 0
      }
    )

    const total = income - outcome
    // this.transactions.forEach(transaction => {
    //   if (transaction.type === 'income') {
    //     console.log('Transaction type: ', transaction.type);

    //     this.balance.income += transaction.value 
    //   } else {
    //     this.balance.outcome += transaction.value
    //   }
    // });

    // this.balance.total = this.balance.income - this.balance.outcome


    return { income, outcome, total }
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
