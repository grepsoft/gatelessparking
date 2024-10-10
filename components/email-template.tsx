import React from 'react'
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Row,
    Column,
    Preview,
    Section,
    Text,
} from '@react-email/components';

interface EmailTemplateProps {
    firstName: string,
    bookingDate: string,
    arrivingOn: string,
    leavingOn: string,
    plateNo: string,
    address: string
}

function EmailTemplate(props: EmailTemplateProps) {

    const {
        firstName,
        bookingDate,
        arrivingOn,
        leavingOn,
        plateNo,
        address } = props
    return (
        <Html>
            <Head />
            <Preview>Your parking reservation receipt.</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading as="h1" style={{ fontSize: '36px', lineHeight: 1.3, color: "#747474", fontWeight: 700, textAlign: "center" }}>Gateless Parking</Heading>
                    <Hr />
                    <Text style={{ fontSize: '22px', padding: '20px', lineHeight: 1.3, color: "#808080" }}>Hi {firstName},</Text>
                    <Text style={{ fontSize: '22px', padding: '20px', lineHeight: 1.3, color: "#808080" }}>Thank you for booking a spot with us!</Text>
                    <Text style={{ fontSize: '22px', padding: '20px', lineHeight: 1.3, color: "#808080" }}>Parking at: {address}</Text>

                    <Section style={track.container}>
                        <Row>
                            <Column>
                                <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Booking date:</Text>
                            </Column>
                            <Column align="right">
                                <Text style={{ fontSize: '18px' }}>{bookingDate}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Arriving on:</Text>
                            </Column>
                            <Column align="right">
                                <Text style={{ fontSize: '18px' }}>{arrivingOn}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Leaving on:</Text>
                            </Column>
                            <Column align="right">
                                <Text style={{ fontSize: '18px' }}>{leavingOn}</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Plate #:</Text>
                            </Column>
                            <Column align="right">
                                <Text style={{ fontSize: '18px', textTransform: 'uppercase' }}>{plateNo}</Text>
                            </Column>
                        </Row>

                        <Row>
                            <Column align="center">
                                <Link
                                    href="http://localhost:3000/mybookings"
                                    style={{ ...button, padding: '10px' }}>
                                    My bookings
                                </Link>
                            </Column>
                        </Row>
                    </Section>

                    <Section >
                        <Row style={footer.policy}>
                            <Column>
                                <Text style={footer.text}>Web Version</Text>
                            </Column>
                            <Column>
                                <Text style={footer.text}>Privacy Policy</Text>
                            </Column>
                        </Row>
                        <Row>
                            <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
                                Please contact us if you have any questions. (If you reply to this
                                email, we won&apos;t be able to see it.)
                            </Text>
                        </Row>
                        <Row>
                            <Text style={footer.text}>
                                © 2024 Gateless Parking, Inc. All Rights Reserved.
                            </Text>
                        </Row>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

export default EmailTemplate

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "10px auto",
    width: "600px",
    maxWidth: "100%",
    border: "1px solid #E5E5E5",
};

const track = {
    container: {
        padding: "22px 40px",
        backgroundColor: "#F7F7F7",
    }
}

const button = {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
} as React.CSSProperties

const footer = {
    policy: {
        width: "166px",
        margin: "auto",
    },
    text: {
        margin: "0",
        color: "#AFAFAF",
        fontSize: "13px",
        textAlign: "center",
    } as React.CSSProperties,
};