import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import * as cheerio from 'cheerio';

import './Detail.css';

const Details = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://www.wunderfauks.com/wp/wp-json/acf/v3/work/${id}`);
                const parsedItem = parseHtmlContent(response.data);
                setItem(parsedItem);

                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);


    const parseHtmlContent = (data) => {
        const parsedData = { ...data };
        if (parsedData.acf && parsedData.acf.work_content_items) {
            parsedData.acf.work_content_items = parsedData.acf.work_content_items.map(contentItem => {
                if (contentItem.acf_fc_layout === 'layout_content_block') {
                    const $ = cheerio.load(contentItem.content_item);
                    contentItem.h2Text = $('h2').text();
                    contentItem.pText = $('p').text();
                }
                return contentItem;
            });
        }
        return parsedData;
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div className={`details-background ${item.acf && item.acf.background_color}`}>
                    <div className="detail-header">
                        <img className="detail-img" src={item.acf.image.url} alt={item.acf.image.title} />
                        <div className="header-content">
                            <h2 className="detail-h2">{item.acf.work_category}</h2>
                            <p className="detail-p">{item.acf.work_sub_category}</p>
                            <p className="detail-p">{item.acf.client}</p>
                        </div>
                    </div>
                    <img className="detail-logo" src={item.acf.logo.url} alt={item.acf.logo.title} />
                    {item.acf.work_content_items.map((contentItem, index) => (
                        <div key={index} style={{ backgroundColor: contentItem.background_color }}>
                            {contentItem.acf_fc_layout === 'layout_single_image' && (
                                <img
                                    className="detail-img"
                                    src={contentItem.single_image.url}
                                    alt={contentItem.single_image.title}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            )}

                            {contentItem.acf_fc_layout === 'layout_content_block' && (
                                <div>
                                    <h2 className="detail-h2">{contentItem.h2Text}</h2>
                                    <p className="detail-p">{contentItem.pText}</p>
                                </div>
                            )}

                            {contentItem.button_text && (
                                <a className="detail-a" href={contentItem.link_url} target="_blank" rel="noopener noreferrer">
                                    {contentItem.button_text}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Details;
