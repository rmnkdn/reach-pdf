import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 30,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
    },
    section: {
        marginBottom: 10,
    },
    header: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 12,
        marginBottom: 5,
    },
});

const Statement = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                <Text style={styles.title}>Bank Statement</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Account Information</Text>
                <Text style={styles.content}>Account Number: XXXXXXXX</Text>
                <Text style={styles.content}>Account Holder: John Doe</Text>
                <Text style={styles.content}>Bank Name: ABC Bank</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.header}>Transactions</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableHeader}>Date</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableHeader}>Description</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.tableHeader}>Amount</Text>
                        </View>
                    </View>
                    {/* Add transaction rows here */}
                    {Array.from({ length: 10 }).map((_, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableContent}>01/01/2022</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableContent}>Purchase</Text>
                            </View>
                            <View style={styles.tableCell}>
                                <Text style={styles.tableContent}>$100.00</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default Statement;