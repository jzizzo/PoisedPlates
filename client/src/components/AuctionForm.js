import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {AutoComplete as MUIAutoComplete} from 'material-ui';
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle,
} from 'redux-form-material-ui';

const states = [
  'AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL',
  'GA','HI','ID','IL','IN','IA','KS','KY','LA','ME',
  'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
  'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

const categories = [
  ['antiques', 'Antiques'],
  ['appliances', 'Appliances'],
  ['arts+crafts', 'Arts & Crafts'],
  ['atv/utv/sno', 'ATVs, UTVs, & Snowmobiles'],
  ['auto parts', 'Auto Parts'],
  ['baby+kid', 'Baby & Kid'],
  ['beauty+hlth', 'Beauty & Health'],
  ['bikes', 'Bikes'],
  ['boats', 'Boats'],
  ['books', 'Books'],
  ['cars+trucks', 'Cars & Trucks'],
  ['cell phones', 'Cell Phones'],
  ['clothes', 'Clothes'],
  ['computers', 'Computers'],
  ['electronics', 'Electronics'],
  ['farm+garden', 'Farm & Garden'],
  ['furniture', 'Furniture'],
  ['general', 'Miscellaneous'],
  ['household', 'Household'],
  ['camping', 'Camping'],
  ['tools', 'Tools'],
  ['toys+games', 'Toys & Games']
];

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);
const tooManyPizzas = value => (value > 15 ? 'Are you mad?' : undefined);

class AuctionForm extends Component {
  componentDidMount() {
    this.refs.name // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus(); // on TextField
  }

  render() {
    const {handleSubmit, pristine, numPizzas, reset, submitting} = this.props;
    const styles = {
      align: {
        verticalAlign: 'bottom'
      },
      button: {
        margin: 8
      },
      state: {
        marginLeft: 16,
        verticalAlign: 'bottom',
        width: 80
      }
    }
    return (
      <form onSubmit={handleSubmit}>
        {/*-- Photo --*/}
        <div>
          <Field
            name="image"
            component={TextField}
            hintText="URL"
            floatingLabelText="Photo"
            validate={required}
          />
        </div>
        {/*-- Category --*/}
        <div>
          <Field
            name="category"
            component={SelectField}
            hintText="Category"
            floatingLabelText="Category"
            validate={required}
          >
            {categories.map((category, idx) => (
              <MenuItem key={idx} value={category[0]} primaryText={category[1]} />
            ))}
          </Field>
        </div>
        {/*-- Title --*/}
        <div>
          <Field
            name="title"
            component={TextField}
            hintText="What is it?"
            floatingLabelText="Title"
            validate={required}
          />
        </div>
        {/*-- Description --*/}
        <div>
          <Field
            name="description"
            component={TextField}
            hintText="What's cool about it?"
            floatingLabelText="Description"
            multiLine
            rows={2}
            validate={required}
          />
        </div>
        {/*-- Location --*/}
        <div>
          <Field
            name="city"
            component={TextField}
            hintText="City"
            floatingLabelText="City"
            validate={required}
            style={styles.align}
          />
          <Field
            name="state"
            component={SelectField}
            hintText="State"
            floatingLabelText="State"
            validate={required}
            style={styles.state}
          >
            {states.map((state, idx) => (
              <MenuItem key={idx} value={state} primaryText={state} />
            ))}
          </Field>
        </div>
        {/*-- End Time --*/}
        <div>
          <Field
            name="date"
            component={DatePicker}
            format={null}
            hintText="End Date"
            validate={required}
            style={styles.align}
          />
          <Field
            name="time"
            component={TimePicker}
            format={null}
            // Do we need this?  defaultValue={null} // TimePicker requires an object,
            // and redux-form defaults to ''
            hintText="End Time"
            validate={required}
            style={styles.align}
          />
        </div>

        <div>
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={()=>{}}
            style={styles.button}
          />
          <Link to="/">
            <RaisedButton
              label="Cancel"
              secondary={true}
              onClick={reset}
              style={styles.button}
            />
          </Link>
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('example');

AuctionForm = connect(state => ({
  numPizzas: selector(state, 'pizzas'),
}))(AuctionForm);

AuctionForm = reduxForm({
  form: 'example',
  initialValues: {
    delivery: 'delivery',
    name: 'Jane Doe',
    cheese: 'Cheddar',
    pizzas: 1,
  },
})(AuctionForm);

export default AuctionForm;