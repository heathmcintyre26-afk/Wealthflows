#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"

usage() {
  cat <<'EOF'
Usage: ./deploy/deploy-hardened.sh <command>

Commands:
  audit    Run dependency security audit (critical severity gate)
EOF
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: required command '$1' is not installed." >&2
    exit 1
  fi
}

run_audit() {
  require_command npm

  cd "${REPO_ROOT}"

  if [[ ! -f package-lock.json ]]; then
    echo "Error: package-lock.json is required for audit." >&2
    exit 1
  fi

  echo "Running hardened dependency audit (audit-level=critical)..."
  npm audit --package-lock-only --audit-level=critical
}

main() {
  if [[ $# -ne 1 ]]; then
    usage
    exit 1
  fi

  case "$1" in
    audit)
      run_audit
      ;;
    -h|--help|help)
      usage
      ;;
    *)
      echo "Error: unknown command '$1'." >&2
      usage
      exit 1
      ;;
  esac
}

main "$@"
