import { faker } from '@faker-js/faker';

interface Referral {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    addressline1?: string;
    addressline2?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    country?: string;
}

// Function to generate fake user data
export default function generateFakeReferral(num: number): Referral[] {
    const referrals: Referral[] = [];

    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = faker.internet.email();
    const phone = faker.helpers.replaceSymbolWithNumber('0##########');
    const addressline1 = faker.location.streetAddress();
    const addressline2 = faker.location.streetAddress();
    const suburb = faker.location.city();
    const state = faker.location.state();
    const postcode = faker.location.zipCode();
    const country = faker.location.country();

    for (let i = 0; i < num; i++) {
        referrals.push({firstname, lastname, email, phone, addressline1, addressline2, suburb, state, postcode, country});
    }

    return referrals;
}
