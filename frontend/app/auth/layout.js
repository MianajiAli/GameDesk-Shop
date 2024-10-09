const layout = ({ children }) => {
    return (
        <>
            <NextSeo noindex={true} nofollow={true} />
            {children}
        </>
    );
}

export default layout;