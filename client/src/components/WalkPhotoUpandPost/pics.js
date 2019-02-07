import React, { Component } from "react";
import { List, ListItem } from "../List";
import { Col, Row, Container } from "../Grid";
import './App.css'
import API from "../../utils/API";
import ImageLoader from 'react-image-file';
import { decode } from "punycode";



class getImagesWalk extends Component {
    state = {
        images: [],
        errorMessage: ""
    };
    componentDidMount() {
        this.loadImages();
    }

    loadImages = () => {

        API.getImages(1)
            .then(res => {
               
                const imageFormat = res.data.map(data => {  
                    console.log("Array",data.image)
                    const imageDataFormat = {
                       image:this.arrayBufferToBase64(data.image.data),
                      //data.image.data,
                        id: data.id
                       // image2:data.image2
                    }
                    console.log("imageFormat",imageDataFormat)
                    return (imageDataFormat)
                })
               // console.log(res.data[0].image.data)
               // console.log("DATA", this.arrayBufferToBase64(res.data[0].image.data))
                console.log("format: ",imageFormat)
                this.setState({ images: imageFormat })
            })

    }
    arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    render() {
        return (

            <Row>
                <Col size="md-12 sm-12">
                    {this.state.images.length ? (
                        <List>
                            {this.state.images.map(image => (
                                <ListItem key={image.id}>
                                    

                                    <img src={`data:image/jpeg;base64,${image.image}`} ></img>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <p className="search__form--alert">Oh No! It looks like you don't have any saved images!</p>
                        )}
                </Col>
            </Row>


        )
    }
}

export default getImagesWalk;