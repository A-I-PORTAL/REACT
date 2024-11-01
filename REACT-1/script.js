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

        // Find the component name (default to App)
        const componentNameMatch = codeWithoutImports.match(/function\s+([A-Z][A-Za-z0-9_]*)\s*
