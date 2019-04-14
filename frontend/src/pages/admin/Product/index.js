import React, { Component, Fragment } from 'react';
import ProductForm from './ProductForm';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        id: '',
        name: '',
        variants: [],
      }
    };
  }

  onNameChange = event => {
    event.persist();
    this.setState(state => ({
      formData: {
        ...state.formData,
        name: event.target.value,
      }
    }));
  };

  addVariant = () => {
    this.setState(state => ({
      formData: {
        ...state.formData,
        variants: [
          ...state.formData.variants,
          {
            name: '',
            images: [],
            description: '',
            weight: 0,
            quantity: 0,
            price: 0,
            discount: 0,
          }
        ]
      },
    }));
  };

  deleteVariant = index => () => {
    const { formData: { variants } } = this.state;
    variants.splice(index, 1);
    this.setState(state => ({
        formData: {
          ...state.formData,
          variants
        }
      }
    ));
  }

  onVariantNameChange = index => event => {
    const { formData: { variants } } = this.state;
    variants[index].name = event.target.value;

    this.setState(state => ({
        formData: {
          ...state.formData,
          variants
        }
      }
    ));
  };

  onWeightChange = index => event => {
    const { formData: { variants } } = this.state;
    variants[index].weight = event.target.value;

    this.setState(state => {
      return {
        formData: {
          ...state.formData,
          variants
        }
      }
    });
  };

  render() {
    const { formData } = this.state;

    return (
      <Fragment>
        <ProductForm
          data={formData}
          onNameChange={this.onNameChange}
          addVariant={this.addVariant}
          deleteVariant={this.deleteVariant}
          onVariantNameChange={this.onVariantNameChange}
          onWeightChange={this.onWeightChange}
        />
      </Fragment>
    );
  }
}

export default Product;
