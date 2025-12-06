import React, { useCallback, useEffect, useState } from "react";
import liferayApi from "../../utils/request";

const CommonServicePage = ({ folderName, urlPathMap, componentMap }) => {
    const [data, setData] = useState(
        Object.keys(urlPathMap).reduce((acc, key) => ({ ...acc, [key]: null }), {})
    );
    const [folderId, setFolderId] = useState(null);

    const getFolderId = useCallback(async () => {
        try {
            const siteId = window.Liferay?.ThemeDisplay?.getSiteGroupId();
            const response = await liferayApi.get(
                `/o/headless-delivery/v1.0/sites/${siteId}/structured-content-folders`
            );
            const folder = response.data.items.find(
                (item) => item.name === folderName
            );
            return folder ? folder.id : null;
        } catch (error) {
            console.error("Error fetching folder:", error);
            return null;
        }
    }, [folderName]);

    const fetchWebContent = useCallback(
        async (friendlyUrlPath) => {
            try {
                if (!folderId) return null;
                const response = await liferayApi.get(
                    `/o/headless-delivery/v1.0/structured-content-folders/${folderId}/structured-contents?filter=friendlyUrlPath eq '${friendlyUrlPath}'`
                );
                return response.data.items?.[0] || null;
            } catch (error) {
                console.error(`Error fetching web content for ${friendlyUrlPath}:`, error);
                return null;
            }
        },
        [folderId]
    );

    useEffect(() => {
        (async () => {
            const id = await getFolderId();
            setFolderId(id);
        })();
    }, [getFolderId]);

    useEffect(() => {
        if (!folderId) return;
        (async () => {
            const results = await Promise.all(
                Object.entries(urlPathMap).map(([key, path]) => fetchWebContent(path))
            );
            const newData = {};
            Object.keys(urlPathMap).forEach((key, idx) => {
                newData[key] = results[idx];
            });
            setData(newData);
        })();
    }, [folderId, fetchWebContent, urlPathMap]);

    return (
        <div className="min-h-dvh bg-[#0D0E0F] text-white overflow-x-hidden">
            {Object.entries(componentMap).map(([key, Comp]) => (
                <Comp key={key} content={data[key]} />
            ))}
        </div>
    );
};

export default CommonServicePage;

