import React, { Component } from 'react';
import axios from 'axios';

class ProductView extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  editProduct = product => () => {
    const { editForm, setHasVariant } = this.props;

    editForm(product);
    setHasVariant(product.variants[0].name !== '')
  }

  deleteProduct = id => () => {
    axios.delete(`http://localhost:8000/api/products/${id}`)
      .then(() => {
        console.log('berhasil')
        this.props.getProducts();
      })
  }

  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    return (
      <div>
        <h1>Products</h1>
        <table border="1">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Rating</th>
              <th>Variants</th>
              <th>Reviews</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
            {data.map(({
              _id,
              name,
              slug,
              rating,
              variants,
              reviews,
              timestamp
            }, index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{slug}</td>
                <td>{rating}</td>
                <td>
                  <table border="1">
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Description</th>
                        <th>Sold Quantity</th>
                        <th>On Wishlist</th>
                        <th>Images</th>
                      </tr>
                      {variants.map(({
                        name,
                        weight,
                        quantity,
                        price,
                        discount,
                        description,
                        soldQuantity,
                        wishlistCount,
                        images
                      }, index) => (
                        <tr key={index}>
                          <td>{name}</td>
                          <td>{weight}</td>
                          <td>{quantity}</td>
                          <td>{price}</td>
                          <td>{discount}</td>
                          <td><pre>{description.substring(0, 100)}...</pre></td>
                          <td>{soldQuantity}</td>
                          <td>{wishlistCount}</td>
                          <td>
                            <ul>
                              {images && images.map((image, index) => (
                                <li key={index}>
                                  <img
                                    src={`http://localhost:8000/img/products/${image}`}
                                    alt={image}
                                    width="200"
                                  />
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>Reviews...</td>
                <td>{timestamp}</td>
                <td>
                  <button onClick={this.editProduct(data[index])}>Edit</button>
                  <button onClick={this.deleteProduct(_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProductView;
