import agility from '@agility/content-fetch';

export default async (req, res) => {

    const api = agility.getApi({
        guid: process.env.AGILITY_GUID,
        apiKey: process.env.AGILITY_API_PREVIEW_KEY,
        isPreview: true
    });
  
    const products = await api.getContentList({
        referenceName: 'productslist',
        languageCode: 'en-us',
    });

    res.status(200).json(products);
}