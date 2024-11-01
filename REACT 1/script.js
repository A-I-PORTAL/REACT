// script.js

// Function to render the React component
function renderComponent() {
    const code = document.getElementById('code-input').value;
    const previewArea = document.getElementById('preview-area');

    // Clear previous content
    previewArea.innerHTML = '';

    try {
        // Remove import statements using regex
        const codeWithoutImports = code.replace(/import\s+.*from\s+['"].*['"];?/g, '');

        // Transpile JSX to JavaScript using Babel
        const transpiledCode = Babel.transform(codeWithoutImports, { presets: ['react'] }).code;

        // Create a new function to execute the transpiled code
        // Pass React as a parameter to allow usage of React.createElement if needed
        const componentFunction = new Function('React', transpiledCode + '; return React.createElement(App || HelloWorld || DefaultComponent);');

        // Execute the function and get the React element
        const element = componentFunction(React);

        // Render the React element into the preview area
        ReactDOM.render(element, previewArea);
    } catch (error) {
        // Display error message to the user within the preview area
        previewArea.innerHTML = `<pre style="color: red;">${error.message}</pre>`;
    }
}

// Add event listener to the Render button
document.getElementById('render-button').addEventListener('click', renderComponent);

// Optional: Render the default component on page load
window.onload = renderComponent;
