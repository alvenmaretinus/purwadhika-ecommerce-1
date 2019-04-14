import React, { PureComponent, Fragment } from 'react';

class ProductForm extends PureComponent {
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

  render () {
    const {
      data: {
        name,
        variants
      },
      onNameChange,
      onVariantNameChange,
      onWeightChange,
      deleteVariant,
    } = this.props;
    const { hasVariant } = this.state;

    return (
      <form encType="multipart/form-data">
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
          variants.map(({ name, weight }, index) => (
            <Fragment key={index}>
              { hasVariant && <h3>Variant {name}</h3>}
              <button type="button" onClick={deleteVariant(index)}>Delete Variant</button>
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
                type="number"
                id={`weight${index}`}
                value={weight}
                onChange={onWeightChange(index)}
              />gr
              <br />
            </Fragment>
          ))
        }
      </form>
    )
  }
}

export default ProductForm;
