import React, { Component, Fragment } from 'react';
import slugify from 'slugify';
import uniqid from 'uniqid';
import path from 'path'
import ProductForm from './ProductForm';
import ProductView from './ProductView';
import axios from 'axios';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        id: '',
        name: '',
        variants: [],
      },
      formImages: {},
      hasVariant: null,
      products: null
    };
  }

  getProducts = () => {
    axios.get('http://localhost:8000/api/products')
      .then(res => {
        this.setState({ products: res.data })
      })
  };

  setHasVariant = hasVariant => {
    this.setState({ hasVariant });
  };

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

    const images = files.files;
    const imageNames = [];
    const formImages = {};
    for (let i = 0; i < images.length; i++) {
      const fileNameWithoutExt = path.basename(images[i].name, path.extname(images[i].name));
      const imageName = `${uniqid(`${slugify(fileNameWithoutExt.toLowerCase())}-`)}${path.extname(images[i].name)}`;
      imageNames.push(imageName);
      formImages[imageName] = images[i];
    }
    variants[index].images = imageNames;
    this.setVariantData(variants);
    this.setState(state => ({
      formImages: {
        ...state.formImages,
        ...formImages,
      }
    }));
  };

  resetForm = () => {
    this.setState({
      formData: {
        id: '',
        name: '',
        variants: [],
      },
      formImages: {},
    });
  };

  editForm = ({
    _id,
    name,
    variants
  }) => {
    const { formData } = this.state;
    formData.id = _id;
    formData.name = name;
    formData.variants = JSON.parse(JSON.stringify(variants));
    this.setState({ formData, formImages: {} });
  }

  render() {
    const { formData, formImages, hasVariant, products } = this.state;

    return (
      <Fragment>
        <ProductForm
          data={formData}
          images={formImages}
          onNameChange={this.onNameChange}
          hasVariant={hasVariant}
          setHasVariant={this.setHasVariant}
          addVariant={this.addVariant}
          deleteVariant={this.deleteVariant}
          resetForm={this.resetForm}
          onVariantNameChange={this.onVariantNameChange}
          onWeightChange={this.onWeightChange}
          onQuantityChange={this.onQuantityChange}
          onPriceChange={this.onPriceChange}
          onDiscountChange={this.onDiscountChange}
          onDescriptionChange={this.onDescriptionChange}
          onImagesChange={this.onImagesChange}
          getProducts={this.getProducts}
        />
        <ProductView
          data={products}
          editForm={this.editForm}
          setHasVariant={this.setHasVariant}
          getProducts={this.getProducts}
        />
      </Fragment>
    );
  }
}

export default Product;
