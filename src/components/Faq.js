import React, { useState } from 'react';
import Header from './Header';
const Faq = () => {

    const [showMsg, setShowMsg] = useState(false)

    return (
        <div>
            <Header />

            <div className=" md:w-10/12 mx-auto md:p-20 p-4">
                <h1 className="font-bold md:text-4xl  text-2xl font-Anek text-center">常见问题</h1>


                <div className="flex flex-wrap justify-center mt-20 font-Inter">

                    <div className="md:w-5/12 m-4 ">
                        <p className="text-xl font-bold py-2">Coverview 是什么？</p>
                        <p className="text-lg text-gray-700">Coverview 是一款能帮助你快速生成博客封面图的工具。</p>
                    </div>

                    <div className="md:w-5/12 m-4">
                        <p className="text-xl font-bold py-2">Coverview 是免费的吗？</p>
                        <p className="text-lg text-gray-700">是的！Coverview 完全免费使用。</p>
                    </div>

                    <div className="md:w-5/12 m-4">
                        <p className="text-xl  font-bold py-2">我可以上传自己的品牌 Logo 吗？</p>
                        <p className="text-lg text-gray-700">当然可以。在图标选择里搜索并选中<span className="font-semibold">custom</span>，就能上传你的 Logo，为封面增添个性。</p>
                        <p className="italic mt-2">查看<a href="https://twitter.com/WankhadeRutik/status/1518270774335111168?s=20&t=XMjbJpGAC7anadJ690_DUg" className="text-blue-400" target="_blank" rel="noreferrer">示例</a></p>
                    </div>

                    <div className="md:w-5/12 m-4">
                        <p className="text-xl font-bold my-2">能用于非技术或个人博客吗？</p>
                        <p className="text-lg text-gray-700">当然可以！尽管 Coverview 起初面向技术博客，但同样适合你的个人文章，尤其是个性十足的主题。</p>
                    </div>

                    <div className="md:w-5/12 m-4">
                        <p className="text-xl font-bold my-2">为什么选择 Coverview？</p>
                        <p className="text-lg text-gray-700">因为它简单、迅速又好用。与其花费数小时设计，不如用几秒钟就生成一张漂亮的封面。</p>
                    </div>

                    <div className="md:w-5/12 m-4">
                        <p className="text-xl font-bold my-2">想支持这个项目吗？</p>
                        <p className="text-lg text-gray-700">如果 Coverview 对你有所帮助，欢迎 <a href="https://github.com/deadmau5v/CoverView" target="_blank" rel="noreferrer" className="font-semibold hover:underline">为仓库加星</a> 并分享给身边的伙伴。</p>
                    </div>

                </div>

                <div className="md:w-1/2 mx-auto text-center mt-20">
                    <button
                        onClick={() => setShowMsg(!showMsg)}
                        className="text-6xl text-center m-2">💡</button>
                    <p className="text-xl font-Anek font-semibold text-gray-800">想知道一个小秘密？点我看看</p>

                </div>

                {
                    showMsg ?
                        <div>
                            <h2 className="md:w-7/12 text-4xl border text-center mx-auto my-10 p-10 rounded-xl shadow-sm font-Nunito">至少包含 8 个词的博客标题能带来 21% 更高的点击率</h2>
                        </div> :
                        <div></div>
                }

            </div>
        </div>
    );
}

export default Faq;
