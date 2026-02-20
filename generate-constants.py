import os
import json

sl_path = r"c:\Users\Tejteju\Downloads\signmaster-asl-dictionary (1)\archive (3)\dataset\SL"

# Get all word folders
words = sorted([d for d in os.listdir(sl_path) if os.path.isdir(os.path.join(sl_path, d))])

# Template for each word
def generate_entry(word):
    return f'''  "{word}": {{
    description: "Sign for {word}. This sign is commonly used in American Sign Language (ASL) to express the concept of '{word}'.",
    handshape: "Various hand shapes",
    movement: "Fluid motion",
    location: "Chest height",
    tips: [
      "Practice the handshape carefully.",
      "Keep the movement smooth and natural."
    ]
  }},
'''

# Generate the database entries
entries = "".join([generate_entry(word) for word in words])

# Read the current file template
template = '''
export interface SignInfo {
  youtubeId?: string;
  youtubeUrl?: string;
  videoSrc?: string;
  description: string;
  handshape: string;
  movement: string;
  location: string;
  tips: string[];
}

export const SIGN_DATABASE: Record<string, SignInfo> = {
'''

closing = '''
};

export const POPULAR_SIGNS = Object.keys(SIGN_DATABASE);
'''

# Write the output file
output_path = r"c:\Users\Tejteju\Downloads\signmaster-asl-dictionary (1)\constants_new.tsx"
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(template)
    f.write(entries)
    f.write(closing)

print(f"Generated constants file with {len(words)} words")
print(f"Output saved to: {output_path}")
