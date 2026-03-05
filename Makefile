.PHONY: serve stop clean help admin publish

PORT ?= 8000

help:
	@echo "Available commands:"
	@echo "  make serve    - Start local web server on port $(PORT)"
	@echo "  make admin    - Open content editor (for non-technical users)"
	@echo "  make publish  - Push changes and publish to GitHub Pages"
	@echo "  make stop     - Stop the web server"
	@echo "  make clean    - Clean up any temporary files"
	@echo ""
	@echo "Usage: make serve PORT=3000 (to use custom port)"
	@echo ""
	@echo "For content editing without coding:"
	@echo "  1. Run 'make serve'"
	@echo "  2. Run 'make admin' in another terminal"
	@echo "  3. Edit content in the browser"
	@echo ""
	@echo "To publish your changes:"
	@echo "  make publish MESSAGE='Your commit message'"

serve:
	@echo "Starting web server on http://localhost:$(PORT)"
	@echo "Press Ctrl+C to stop the server"
	@echo ""
	@echo "View website: http://localhost:$(PORT)"
	@echo "Edit content: http://localhost:$(PORT)/admin.html"
	@python3 -m http.server $(PORT) || python -m SimpleHTTPServer $(PORT)

admin:
	@echo "Opening content editor..."
	@echo "If browser doesn't open automatically, go to:"
	@echo "http://localhost:$(PORT)/admin.html"
	@sleep 1
	@command -v xdg-open > /dev/null && xdg-open "http://localhost:$(PORT)/admin.html" || \
	 command -v open > /dev/null && open "http://localhost:$(PORT)/admin.html" || \
	 echo "Please open http://localhost:$(PORT)/admin.html in your browser"

publish:
	@echo "📦 Publishing to GitHub Pages..."
	@echo ""
	@if [ -z "$(MESSAGE)" ]; then \
		echo "⚠️  No commit message provided. Using default message."; \
		MESSAGE="Update website content"; \
	else \
		MESSAGE="$(MESSAGE)"; \
	fi; \
	echo "📝 Commit message: $$MESSAGE"; \
	echo ""; \
	git add -A && \
	git commit -m "$$MESSAGE" && \
	git push origin main && \
	echo "" && \
	echo "✅ Successfully published to GitHub Pages!" && \
	echo "🌐 Your website will be live in a few minutes at:" && \
	echo "   https://$(shell git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/' | sed 's/\(.*\)\/\(.*\)/\1.github.io\/\2/')" && \
	echo "" || \
	(echo "❌ Failed to publish. Please check:" && \
	 echo "   1. You have committed changes to push" && \
	 echo "   2. You have internet connection" && \
	 echo "   3. You have push access to the repository" && \
	 echo "" && \
	 echo "💡 Tip: Use 'git status' to check your changes")

stop:
	@pkill -f "http.server $(PORT)" || pkill -f "SimpleHTTPServer $(PORT)" || echo "No server running on port $(PORT)"

clean:
	@echo "Cleaning up..."
	@find . -name ".DS_Store" -delete
	@echo "Done!"
