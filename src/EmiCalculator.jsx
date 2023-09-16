import React, { useState } from "react";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [tenureMonths, setTenureMonths] = useState(0);
  const [emi, setEMI] = useState(0);
  const [totalInterestPayable, setTotalInterestPayable] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interest) / (12 * 100);
    const n = parseFloat(tenureMonths);

    const E = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalInterest = parseFloat((E * n - P).toFixed(2));
    const totalAmt = parseFloat((E * n).toFixed(2));

    setEMI(E);
    setTotalInterestPayable(totalInterest);
    setTotalPayment(totalAmt);

    const amortization = [];
    let balance = P;
    let totalInterestPaid = 0;

    for (let i = 1; i <= n; i++) {
      const interestPaid = parseFloat((balance * r).toFixed(2));
      const principalPaid = parseFloat((E - interestPaid).toFixed(2));
      totalInterestPaid += interestPaid;
      balance = parseFloat((balance - principalPaid).toFixed(2));
      const row = {
        month: i,
        openingBalance: balance + principalPaid,
        emi: E,
        interest: interestPaid,
        principal: principalPaid,
        closingBalance: balance,
        totalInterestPaid: totalInterestPaid,
      };
      amortization.push(row);
    }

    setAmortizationSchedule(amortization);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    calculateEMI();
  };

  return (
    <>
      <h2
        className="mb-4 text-center  text-white"
        style={{ background: " #333" }}
      >
        Emi Calculator
      </h2>
      <Container className="py-4 border my-3 border-5 rounded">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="principal">
                <Form.Label className="fw-bold">Principal Amount</Form.Label>
                <NumericFormat
                  className="form-control"
                  thousandSeparator={true}
                  prefix={"₹"}
                  required
                  decimalScale={2}
                  allowNegative={false}
                  onValueChange={(values) =>
                    setPrincipal(values.floatValue || 0)
                  }
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="interest">
                <Form.Label className="fw-bold">Interest Rate</Form.Label>
                <NumericFormat
                  className="form-control"
                  suffix={"%"}
                  required
                  decimalScale={2}
                  allowNegative={false}
                  onValueChange={(values) =>
                    setInterest(values.floatValue || 0)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="tenureMonths">
                <Form.Label className="fw-bold mt-2">
                  Loan Tenure in Months
                </Form.Label>
                <NumericFormat
                  className="form-control"
                  suffix={"Months"}
                  required
                  decimalScale={0}
                  allowNegative={false}
                  onValueChange={(values) =>
                    setTenureMonths(values.floatValue || 0)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="my-2 ">
            Calculate
          </Button>

          {emi !== 0 && (
            <div className="mt-4">
              <hr />

              <h5>EMI: ₹{emi.toFixed(2)}</h5>
              <h5>
                Total Interest Payable: ₹{totalInterestPayable.toFixed(2)}
              </h5>
              <h5>
                Total Payment <span>(Principal + Interest)</span>: ₹
                {totalPayment.toFixed(2)}
              </h5>
              <h3 className="mb-4 text-center  bg-secondary  text-white">
                Amortization Schedule
              </h3>
              <Table striped responsive bordered hover className="mt-4">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Opening Balance</th>
                    <th>EMI</th>
                    <th>Interest</th>
                    <th>Principal</th>
                    <th>Closing Balance</th>
                    <th>Total Interest Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.map((row) => (
                    <tr key={row.month}>
                      <td>{row.month}</td>
                      <td>₹{row.openingBalance.toFixed(2)}</td>
                      <td>₹{row.emi.toFixed(2)}</td>
                      <td>₹{row.interest.toFixed(2)}</td>
                      <td>₹{row.principal.toFixed(2)}</td>
                      <td>₹{row.closingBalance.toFixed(2)}</td>
                      <td>₹{row.totalInterestPaid.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Form>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          &copy; {new Date().getFullYear()} Made By:{" "}
          <a
            className="text-dark text-decoration-none font-weight-bold"
            href="https://github.com/Praveenskg"
          >
            Praveen Singh
          </a>
        </div>
      </Container>
    </>
  );
};

export default EMICalculator;
