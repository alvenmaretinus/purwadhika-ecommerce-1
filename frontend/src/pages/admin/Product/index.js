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
            images: null,
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
  };

  setVariantData(variants) {
    this.setState(state => ({
      formData: {
        ...state.formData,
        variants
      }
    }));
  }

  onVariantNameChange = index => event => {
    const { formData: { variants } } = this.state;
    variants[index].name = event.target.value;

    this.setVariantData(variants);
  };

  onWeightChange = index => ({ target: { value } }) => {
    if (isNaN(value)) {
      return;
    }

    const { formData: { variants } } = this.state;
    variants[index].weight = parseInt(value, 10) || 0;

    this.setVariantData(variants);
  };

  onDescriptionChange = index => event => {
    const { formData: { variants } } = this.state;
    variants[index].description = event.target.value;

    this.setVariantData(variants);
  };

  onQuantityChange = index => ({ target: { value } }) => {
    if (isNaN(value)) {
      return;
    }

    const { formData: { variants } } = this.state;
    variants[index].quantity = parseInt(value, 10) || 0;

    this.setVariantData(variants);
  };

  onPriceChange = index => ({ target: { value } }) => {
    if (isNaN(value)) {
      return;
    }

    const { formData: { variants } } = this.state;
    variants[index].price = parseInt(value, 10) || 0;

    this.setVariantData(variants);
  };

  onDiscountChange = index => ({ target: { value } }) => {
    if (isNaN(value)) {
      return;
    }

    const { formData: { variants } } = this.state;
    variants[index].discount = parseInt(value, 10) || 0;

    this.setVariantData(variants);
  };

  onImagesChange = index => ({ target: files }) => {
    const { formData: { variants } } = this.state;
    variants[index].images = files;

    this.setVariantData(variants);
  };

  render() {
    const { formData } = this.state;
console.log(this.state.formData)
    return (
      <Fragment>
        <ProductForm
          data={formData}
          onNameChange={this.onNameChange}
          addVariant={this.addVariant}
          deleteVariant={this.deleteVariant}
          onVariantNameChange={this.onVariantNameChange}
          onWeightChange={this.onWeightChange}
          onQuantityChange={this.onQuantityChange}
          onPriceChange={this.onPriceChange}
          onDiscountChange={this.onDiscountChange}
          onDescriptionChange={this.onDescriptionChange}
          onImagesChange={this.onImagesChange}
        />
      </Fragment>
    );
  }
}

export default Product;
