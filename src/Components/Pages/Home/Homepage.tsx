import { Carousel, Layout } from 'antd';

const divStyle: React.CSSProperties = {
    height: '75vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};
const imgStyle: React.CSSProperties = {
    height: '100%'
}
const Homepage: React.FC = () => (
    <Layout>
        <Carousel autoplay style={{ padding: '1%' }}>
            <div>
                <div style={divStyle}>
                    <img style={imgStyle} src='https://live.staticflickr.com/7924/46355781264_9a56f6d0e2.jpg' />
                </div>
            </div>
            <div>
                <div style={divStyle}>
                    <img style={imgStyle} src='https://th.bing.com/th/id/OIP.XkluR3aMa-8WeV_yqAG3NAHaE8?w=272&h=181&c=7&r=0&o=5&pid=1.7' />
                </div>
            </div>
            <div>
                <div style={divStyle}>
                    <img style={imgStyle} src='https://ischool.vn/wp-content/uploads/2022/12/giao-duc-stem-1.jpg' />
                </div>
            </div>
            <div>
                <div style={divStyle}>
                    <img style={imgStyle} src='https://th.bing.com/th/id/OIP.QqWxyifqesDDAcQAF2kx7AHaE8?rs=1&pid=ImgDetMain' />
                </div>
            </div>
        </Carousel>
    </Layout>
)

export default Homepage;