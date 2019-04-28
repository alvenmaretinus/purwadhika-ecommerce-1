import React, { Component, Fragment } from 'react';
import axios from 'axios';

class ProductForm extends Component {
  constructor() {
    super();
    this.state = {
      hasVariant: null,
    }
  }

  setHasVariant = hasVariant => () => {
    this.setState({ hasVariant });
    this.props.addVariant();
  }

  onFormSubmit = e => {
    e.preventDefault();

    const { data: { name, variants } } = this.props;
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const formData = new FormData();
    formData.append('name', name)
    formData.append('variants', JSON.stringify(variants))

    axios.post('http://localhost:8000/api/products', formData, config).then(response => {
      console.log(response)
    })
  };

  render () {
    const {
      data: {
        name,
        variants
      },
      onNameChange,
      onVariantNameChange,
      onWeightChange,
      onDescriptionChange,
      onQuantityChange,
      onPriceChange,
      onDiscountChange,
      onImagesChange,
      deleteVariant,
    } = this.props;
    const { hasVariant } = this.state;

    return (
      <form encType="multipart/form-data" onSubmit={this.onFormSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={onNameChange} />
        <br />
        {
          (hasVariant === null || hasVariant === true) && (
            <Fragment>
              <button type="button" onClick={this.setHasVariant(true)}>Add Variant</button>
              {hasVariant === null && 
                <button type="button" onClick={this.setHasVariant(false)}>Product Has No Variant</button>}
              <br />
            </Fragment>
          )
        }
        {variants.length > 0 && 
          variants.map(({ name, weight, description, quantity, price, discount }, index) => (
            <Fragment key={index}>
              { hasVariant && (
                <Fragment>
                  <h3>Variant {name}</h3>
                  <button type="button" onClick={deleteVariant(index)}>Delete Variant</button>
                </Fragment>
              )}
              <br />
              <label htmlFor={`variantName${index}`}>Variant Name</label>
              <input
                type="text"
                id={`variantName${index}`}
                value={name}
                onChange={onVariantNameChange(index)}
              />
              <br />
              <label htmlFor={`weight${index}`}>Weight</label>
              <input
                type="text"
                id={`weight${index}`}
                value={weight}
                onChange={onWeightChange(index)}
              />gr
              <br />
              <label htmlFor={`quantity${index}`}>Quantity</label>
              <input
                type="text"
                id={`quantity${index}`}
                value={quantity}
                onChange={onQuantityChange(index)}
              />pcs
              <br />
              <label htmlFor={`price${index}`}>Price</label>
              Rp<input
                type="text"
                id={`price${index}`}
                value={price}
                onChange={onPriceChange(index)}
              />
              <br />
              <label htmlFor={`discount${index}`}>Discount</label>
              <input
                type="text"
                id={`discount${index}`}
                value={discount}
                onChange={onDiscountChange(index)}
              />%
              <br />
              <label htmlFor={`description${index}`}>Description</label>
              <textarea
                id={`description${index}`}
                cols="30"
                rows="10"
                value={description}
                onChange={onDescriptionChange(index)}
              />
              <br />
              <input type="file" multiple onChange={onImagesChange(index)} />
              <button>Submit</button>
            </Fragment>
          ))
        }
      </form>
    )
  }
}

export default ProductForm;