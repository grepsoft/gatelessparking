import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import React from 'react'


interface EmailTemplateProps {
    plate: string,
    address: string,
    timestamp: string
}
function ViolationEmailTemplate(props: EmailTemplateProps) {
    const {plate, address, timestamp } = props

  return (
    <Html>
        <Head />
        <Preview>Violation reported at {address}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading as="h1" 
                style={{ fontSize: '36px', lineHeight: 1.3, color: "#747474", fontWeight: 700, textAlign: "center" }}
                >
                    Violation at: {address}
                </Heading>
                <Hr />
                <Text  style={{ fontSize: '22px', padding: '20px', lineHeight: 1.3, color: "#808080" }}>
                    Plate: {plate}
                </Text>
                <Text  style={{ fontSize: '22px', padding: '20px', lineHeight: 1.3, color: "#808080" }}>
                    Date: {timestamp}
                </Text>
            </Container>
        </Body>
    </Html>
  )
}

export default ViolationEmailTemplate

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