import setuptools


with open("README.md") as fp:
    long_description = fp.read()


setuptools.setup(
    name="Hello Lambda Python",
    version="0.0.1",

    description="A Pipeline to deploy Hello Lambda in Python",
    long_description=long_description,
    long_description_content_type="text/markdown",

    author="Chilcano",

    package_dir={"": "hello_lambda_py"},
    packages=setuptools.find_packages(where="hello_lambda_py"),

    install_requires=[
        "aws-cdk.core==1.87.1",
    ],

    python_requires=">=3.6",

    classifiers=[
        "Development Status :: 4 - Beta",

        "Intended Audience :: Developers",

        "License :: OSI Approved :: Apache Software License",

        "Programming Language :: JavaScript",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",

        "Topic :: Software Development :: Code Generators",
        "Topic :: Utilities",

        "Typing :: Typed",
    ],
)
