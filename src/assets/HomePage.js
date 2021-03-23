import React, { useState } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from './Card.js';

function HomePage() {

    let [CardValue, setCardValue] = useState("Please Submit the link");
    // let [SavedResponse, SetSavedResponse] = useState("");
    let [AmazonLink, SetAmazonLink] = useState("");
    let formData = new FormData();

    let UploadLink = () => {
        formData.append("product_original_link", AmazonLink);
        console.log(AmazonLink);
        fetch('https://dockertestjap.herokuapp.com/api/add-product', {
            method: 'POST',
            body: formData
        }).then((response) => changeCard(response));        

    }

    let changeCard = (res) =>{
        console.log('this change card function is running.')
        console.log(res);
        // now update the card
        if (res['status'] === 201) {
            setCardValue('Your product was successfully recorded')
        } else if (res['status'] === 208) {
            setCardValue('We already knew about this product. Learn more about the product')
        } else if (res['status'] === 400) {
            setCardValue('There was an issue with the link you submitted')
        }else if (res['status'] === 406) {
            setCardValue('The link you submitted is not an amazon link. Please check the link again.')
        }else if (res['status'] === 500) {
            setCardValue('There was an error in the server. Please report it to the developer.')
        }

    }


    return (
        <div className='Header'>
            <h1>
                Enter Amazon Link Here
            </h1>
            <TextField id="outlined-basic" label="Amazon Product Link" variant="outlined" onChange={(e) => { SetAmazonLink(e.target.value)}} />
            <Button onClick={UploadLink} variant="contained" color="primary">Submit</Button>
            <Card text={CardValue} />


        </div>
    )
}

export default HomePage
