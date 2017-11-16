import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Input,
  Container,
  List,
  Form,
  Checkbox,
} from 'semantic-ui-react';

class App extends Component {
  addNewItem() {
    const { addItem } = this.props;
    if (!this.input.inputRef.value) return;
    addItem(this.input.inputRef.value);
    this.input.inputRef.value = '';
  }

  handleSubmit(e) {
    e.preventDefault();
    this.addNewItem();
  }

  render() {
    const { store, completeItem, removeItem } = this.props;
    return (
      <Container style={{ marginTop: 40 }}>
        <Form onSubmit={this.addNewItem.bind(this)}>
          <Input
            fluid
            ref={ref => (this.input = ref)}
            icon={
              <Button positive onClick={this.addNewItem.bind(this)}>
                Добавить
              </Button>
            }
            placeholder="Введите текст..."
          />
        </Form>

        <List divided verticalAlign="middle">
          {store.map((item, index) => (
            <List.Item
              style={{
                textDecoration: item.get('completed') ? 'line-through' : '',
              }}
              key={index}>
              <Checkbox
                onClick={() => completeItem(item.get('id'))}
                checked={item.get('checked')}
              />
              <List.Content verticalAlign="middle">
                #{item.get('id')} - {item.get('text')}
              </List.Content>
              <List.Content floated="right">
                <Button onClick={() => removeItem(item.get('id'))} negative>
                  Удалить
                </Button>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  store,
});

const mapDispatchToProps = dispatch => ({
  addItem: text => dispatch({ type: 'ADD_ITEM', payload: text }),
  completeItem: id => dispatch({ type: 'COMPLETE_ITEM', payload: id }),
  removeItem: id => dispatch({ type: 'REMOVE_ITEM', payload: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
