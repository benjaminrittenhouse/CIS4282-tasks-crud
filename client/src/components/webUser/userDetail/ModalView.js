import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import "./modalView.css"

const ModalView = ({ userData }) => {
    const fullName = userData.firstName + " " + userData.lastName;

    const [isData, setIsData] = useState(false);


    useEffect(() => {
        if (userData.firstName !== undefined) {
            setIsData(true);
        } else {
            setIsData(false)
        }
    }, [userData]);

    return (
        <Card className="modalView">
            <CardContent className="userDetail__content">
                <Typography variant="subtitle1" component="div">
                    MODAL WINDOW!!!
                </Typography>

            </CardContent>
        </Card>
    );
};

export default ModalView;
