
const tomorrows_date = () => {
        const date = new Date();
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate() + 1}/${new Date(date).getFullYear()}`;
    }



module.exports = tomorrows_date