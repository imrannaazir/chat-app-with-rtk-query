const getPartnerInfo = (partners, email) => {
    return partners?.find(user => user.email !== email);
}

export default getPartnerInfo;