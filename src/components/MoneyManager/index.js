import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TransactionItem from '../TransactionItem'

import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    inputTitle: '',
    inputAmount: '',
    inputType: transactionTypeOptions[0].displayText,
    transactionList: [],
    balance: 0,
    income: 0,
    expense: 0,
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({inputAmount: event.target.value})
  }

  onChangeType = event => {
    this.setState({inputType: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {inputTitle, inputAmount, inputType} = this.state
    const newTransactionList = {
      id: uuidv4(),
      title: inputTitle,
      amount: inputAmount,
      type: inputType,
    }

    if (inputType === 'Income') {
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newTransactionList],
        inputTitle: '',
        inputAmount: '',
        inputType: transactionTypeOptions[0].displayText,
        income: prevState.income + parseInt(inputAmount),
      }))

      this.setState(prevState => ({
        balance: prevState.income - prevState.expense,
      }))
    } else {
      this.setState(prevState => ({
        transactionList: [...prevState.transactionList, newTransactionList],
        inputTitle: '',
        inputAmount: '',
        inputType: transactionTypeOptions[0].displayText,
        expense: prevState.expense + parseInt(inputAmount),
      }))
      this.setState(prevState => ({
        balance: prevState.income - prevState.expense,
      }))
    }
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const getDelete = transactionList.filter(eachId => id === eachId.id)
    const getFilter = transactionList.filter(eachFilter => id !== eachFilter.id)

    if (getDelete[0].type === 'Income') {
      this.setState(prevState => ({
        transactionList: getFilter,
        income: prevState.income - parseInt(getDelete[0].amount),
        balance: prevState.balance - parseInt(getDelete[0].amount),
      }))
    } else {
      this.setState(prevState => ({
        transactionList: getFilter,
        expense: prevState.expense - parseInt(getDelete[0].amount),
        balance: prevState.balance + parseInt(getDelete[0].amount),
      }))
    }
  }

  render() {
    const {
      inputTitle,
      inputAmount,
      inputType,
      income,
      expense,
      balance,
      transactionList,
    } = this.state
    return (
      <div className="bg-container">
        <div className="money-manager-card">
          <h1 className="title">Hi, Richard</h1>
          <p className="description">
            Welcome back to your{' '}
            <span className="span-description">Money Manager</span>
          </p>
        </div>
        <div className="money-details-card">
          <MoneyDetails
            incomeAmount={income}
            expensesAmount={expense}
            balanceAmount={balance}
          />
        </div>

        <div className="lower-container">
          <form className="transaction-form" onSubmit={this.onAddTransaction}>
            <h1 className="lower-box-title">Add Transaction</h1>
            <label htmlFor="title" className="labelInput">
              TITLE
            </label>
            <input
              type="input"
              placeholder="TITLE"
              className="input"
              onChange={this.onChangeTitle}
              value={inputTitle}
            />
            <label htmlFor="amount" className="label-input">
              AMOUNT
            </label>
            <input
              type="input"
              placeholder="AMOUNT"
              className="input"
              onChange={this.onChangeAmount}
              value={inputAmount}
            />
            <label htmlFor="incomeType" className="labelInput">
              Type
            </label>
            <select
              id="incomeType"
              className="input"
              onChange={this.onChangeType}
              value={inputType}
            >
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <div className="history-card">
            <h1 className="lower-box-title">History</h1>
            <div className="box">
              <div className="headings">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </div>
            </div>
            <ul className="u-list">
              {transactionList.map(eachList => (
                <TransactionItem
                  key={eachList.id}
                  transactionDetails={eachList}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
