# 📊 Data Directory

This directory contains all the structured data that powers the SoM FAQ application. Each JSON file serves a specific purpose in providing comprehensive support for Summer of Making participants.

## 📁 File Structure

### `config.json`
Configuration file that defines the application's metadata, FAQ categories, and support links.

**Contains:**
- Application metadata (title, description, version)
- FAQ categories with icons and descriptions
- Support channel links and documentation URLs

### `faqs.json`
The main FAQ database containing all questions and answers organized by category.

**Contains:**
- Question and answer pairs
- Category assignments
- Staff attributions for answers
- Reference links to original Slack conversations

### `ai-training.json`
Training data for the AI assistant to improve response accuracy and consistency.

**Contains:**
- Question/answer training pairs
- Correct vs incorrect AI responses
- Training notes and improvement guidelines
- Response style instructions

### `staff.json`
Information about SoM support team members for proper attribution and contact.

**Contains:**
- Staff member profiles
- Roles and responsibilities
- Slack IDs and profile images
- Contact information

## 🤝 Contributing to Data Files

### Adding New FAQs (`faqs.json`)

1. **Structure your entry:**
```json
{
  "question": "Your question here?",
  "answer": "Detailed answer with proper formatting and links",
  "category": "general|shipping|orders|projects|verification|other",
  "staff": "staff_id_from_staff.json_or_null",
  "reference": "slack_link_or_null"
}
```

2. **Guidelines:**
   - Use clear, concise questions that users would actually ask
   - Provide comprehensive answers with relevant links
   - Include Slack channel links in format: `[#channel-name](https://slack.com/archives/CHANNEL_ID)`
   - Assign appropriate category from the predefined list
   - Add staff attribution if the answer came from a specific team member
   - Include reference links to original Slack conversations when available

3. **Categories:**
   - `general` - General SoM questions
   - `shipping` - Ship approval and certification
   - `orders` - Shop orders and rewards
   - `projects` - Project development and requirements
   - `verification` - Identity verification process
   - `other` - Miscellaneous questions

### Updating Configuration (`config.json`)

1. **Adding new categories:**
   - Add to the `categories` array
   - Include unique `id`, descriptive `name`, `description`, and appropriate `icon`
   - Update corresponding FAQ entries to use the new category

2. **Updating support links:**
   - Modify URLs in the `supportLinks` section
   - Ensure all links are current and accessible

3. **Metadata updates:**
   - Update `lastUpdated` when making significant changes
   - Increment `version` for major updates

### Improving AI Training (`ai-training.json`)

1. **Adding training entries:**
```json
{
  "id": "unique_identifier",
  "question": "User's question",
  "correct_answer": "The ideal response",
  "ai_response": "What the AI actually said",
  "is_correct": false,
  "notes": "Explanation of what was wrong and how to improve"
}
```

2. **Guidelines:**
   - Focus on common mistakes or misunderstandings
   - Provide clear explanations in the `notes` field
   - Keep the tone friendly and helpful, matching Hack Club's style
   - Include specific channel recommendations when appropriate

### Managing Staff Information (`staff.json`)

1. **Adding new staff members:**
```json
"staff_id": {
  "id": "staff_id",
  "name": "@SlackHandle",
  "role": "Their role in SoM",
  "imageUrl": "Slack profile image URL",
  "slackId": "Slack user ID"
}
```

2. **Guidelines:**
   - Use consistent naming conventions
   - Ensure profile images are accessible
   - Keep role descriptions concise but descriptive
   - Verify Slack IDs are correct

## 🔄 Data Validation

Before submitting changes:

1. **JSON Validation:**
   - Ensure all JSON files are properly formatted
   - Check for syntax errors and missing commas
   - Validate that all required fields are present

2. **Link Verification:**
   - Test all Slack channel links
   - Verify external URLs are accessible
   - Ensure reference links point to correct conversations

3. **Content Review:**
   - Check for spelling and grammar errors
   - Ensure answers are accurate and up-to-date
   - Verify staff attributions are correct

## 📝 Best Practices

- **Consistency:** Follow existing patterns and formatting
- **Accuracy:** Double-check all information before adding
- **Completeness:** Provide comprehensive answers that address the full question
- **Attribution:** Credit staff members and reference sources when appropriate
- **Maintenance:** Regularly review and update outdated information

## 🚀 Deployment

Changes to data files are automatically reflected in the application. No additional build steps are required for data updates.